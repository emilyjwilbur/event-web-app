import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { FormField, Label, List, Segment } from 'semantic-ui-react';

// Loads the Places library (works with the existing <script> tag in index.html)
async function getPlacesLibrary() {
  if (window.google?.maps?.importLibrary) {
    return window.google.maps.importLibrary('places');
  }
  return window.google.maps.places;
}

// Converts the old react-places-autocomplete "options" prop into a Places API (New) request,
// so the City and Venue fields in your event form don't need to change.
//   City:  options={{ types: ['(cities)'] }}
//   Venue: options={{ location: ..., radius: 1000, types: ['establishment'] }}
function buildRequest(input, options = {}, sessionToken) {
  const request = { input, sessionToken };

  // Old-style broad types like 'establishment' aren't accepted by the new API,
  // so only pass through specific ones such as '(cities)'
  const types = (options.types || []).filter(
    (t) => t !== 'establishment' && t !== 'geocode'
  );
  if (types.length) {
    request.includedPrimaryTypes = types;
  }

  if (options.location) {
    const loc = options.location;
    const center =
      typeof loc.lat === 'function' ? { lat: loc.lat(), lng: loc.lng() } : loc;
    if (center && Number.isFinite(center.lat) && Number.isFinite(center.lng)) {
      request.locationBias = { center, radius: options.radius || 1000 };
    }
  }

  return request;
}

export default function MyPlaceInput({ label, options, ...props }) {
  const [field, meta, helpers] = useField(props);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const sessionToken = useRef(null);
  const debounceTimer = useRef(null);
  const latestQuery = useRef('');

  const address = field.value?.address || '';

  useEffect(() => () => clearTimeout(debounceTimer.current), []);

  async function fetchSuggestions(input) {
    latestQuery.current = input;
    if (!input || input.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const { AutocompleteSuggestion, AutocompleteSessionToken } =
        await getPlacesLibrary();
      if (!sessionToken.current) {
        sessionToken.current = new AutocompleteSessionToken();
      }
      const { suggestions: results } =
        await AutocompleteSuggestion.fetchAutocompleteSuggestions(
          buildRequest(input, options, sessionToken.current)
        );
      // Ignore responses for older keystrokes
      if (latestQuery.current === input) {
        setSuggestions(results.filter((s) => s.placePrediction));
      }
    } catch (error) {
      console.error('Places autocomplete error:', error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    helpers.setValue({ address: value, latLng: null });
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => fetchSuggestions(value), 300);
  }

  async function handleSelect(suggestion) {
    const prediction = suggestion.placePrediction;
    const text = prediction.text.toString();
    setSuggestions([]);
    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: ['location'] });
      helpers.setValue({
        address: text,
        latLng: { lat: place.location.lat(), lng: place.location.lng() },
      });
    } catch (error) {
      console.error('Place details error:', error);
      helpers.setError('Could not load that location, please try again');
    } finally {
      // A new session starts after each selection (keeps billing per-session)
      sessionToken.current = null;
    }
  }

  function handleBlur() {
    helpers.setTouched(true);
    setSuggestions([]);
    // Same rule as before: a place must be picked from the list
    if (!field.value?.latLng) {
      helpers.setValue({ address: '', latLng: null });
    }
  }

  const errorText =
    meta.error && typeof meta.error === 'object' ? meta.error.address : meta.error;

  return (
    <FormField
      error={meta.touched && !!meta.error}
      style={{ position: 'relative' }}
    >
      {label && <label>{label}</label>}
      <input
        name={field.name}
        value={address}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={props.placeholder}
        autoComplete='off'
      />
      {meta.touched && errorText ? (
        <Label basic color='red'>
          {errorText}
        </Label>
      ) : null}
      {(suggestions.length > 0 || loading) && (
        <Segment
          loading={loading}
          style={{
            marginTop: 0,
            position: 'absolute',
            zIndex: 1000,
            width: '100%',
          }}
        >
          <List selection>
            {suggestions.map((s) => {
              const p = s.placePrediction;
              return (
                <List.Item
                  key={p.placeId}
                  // onMouseDown + preventDefault keeps focus in the input,
                  // so blur doesn't clear the field before the click registers
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSelect(s);
                  }}
                >
                  <List.Header>{(p.mainText || p.text).toString()}</List.Header>
                  {p.secondaryText && (
                    <List.Description>{p.secondaryText.toString()}</List.Description>
                  )}
                </List.Item>
              );
            })}
          </List>
        </Segment>
      )}
    </FormField>
  );
}