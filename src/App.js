import { useState, useEffect } from 'react';
import './App.css';
import './tachyons.min.css';
import allListings from './sampleListings';

function filterListings(listings, /** TODO more args? */) {
  // TODO
  return listings;
};

function App() {
  /* state for filters and sorts */
  // filters
  const [maleOnly, setMaleOnly] = useState(false);
  const [femaleOnly, setFemaleOnly] = useState(false);
  const [privateBathAvailable, setPrivateBathAvailable] = useState(false);
  const [ageFilter, setAgeFilter] = useState(null);
  const [ageMin, setAgeMin] = useState(0);
  const [ageMax, setAgeMax] = useState(0);
  // sorts
  const [sortByAgeMin, setSortByAgeMin] = useState(false);
  const [sortByCheapestBedroom, setShortByCheapestBedroom] = useState(false);

  const listingsToRender = filterListings(allListings, /** TODO additional args? */);

  return (
    <div className="App pa4 tl">
      <h1 className='ft mb4 mt0 tl'>{'Listings search tool'}</h1>
      <div className='tl fw7 f5'>
        {'Filters'}
      </div>
      <div className='ml3'>
        <FilterRow>
          { renderCheckbox([maleOnly, setMaleOnly]) }
          { 'Male Only' }
        </FilterRow>
        <FilterRow>
          { renderCheckbox([femaleOnly, setFemaleOnly]) }
          { 'Female Only' }
        </FilterRow>
        <FilterRow>
          { renderCheckbox([privateBathAvailable, setPrivateBathAvailable]) }
          { 'Private Bath Available' }
        </FilterRow>
        <div className='flex items-center mt2'>
          <label className='flex items-center'>
            { renderCheckbox([ageFilter, setAgeFilter]) }
            <div className='mr2'>
              { 'All Ages Between ' }
            </div>
          </label>
          <input className='w3' type='number' value={ageMin} onChange={(ev) => setAgeMin(parseInt(ev.target.value))} />
          <div className='mh2'>
            { 'and' }
          </div>
          <input className='w3' type='number' value={ageMax} onChange={(ev) => setAgeMax(parseInt(ev.target.value))} />
        </div>
      </div>
      <div className='tl fw7 f5 mt3'>
        {'Sorts'}
      </div>
      <div className='ml3'>
      <FilterRow>
          {renderCheckbox([sortByAgeMin, setSortByAgeMin])}
          {'By cheapest bedroom available'}
        </FilterRow>
        <FilterRow>
          {renderCheckbox([sortByCheapestBedroom, setShortByCheapestBedroom])}
          {'By min tenant age'}
        </FilterRow>
      </div>
      <div className='f3 mt4 mb3 fw7 tl'>
        {'Results'}
      </div>
      <table className='f7'>
        <thead>
          <td className='bb b--light-gray pv2 fw7 bg-light-gray'>
            {'Address'}
          </td>
          <td className='bb b--light-gray pv2 fw7 bg-light-gray'>
            {'Tenants'}
          </td>
          <td className='bb b--light-gray pv2 fw7 bg-light-gray'>
            {'Pets'}
          </td>
          <td className='bb b--light-gray pv2 fw7 bg-light-gray'>
            {'Bedrooms available'}
          </td>
        </thead>
        <tbody>
          {
            listingsToRender.map((item) => renderListingRow(item))
          }
        </tbody>
        {
          (!listingsToRender || listingsToRender.length === 0) &&
          ('No results')
        }
      </table>
    </div>
  );
}

const renderCheckbox = ([ value, setValue ]) => {
  return (
    <input className='mr2' type='checkbox' checked={!!value} onChange={(ev) => setValue(!!ev.target.checked)} />
  );
};

const FilterRow = ({ children }) => {
  return (
    <label className='flex items-center mt2'>
      { children }
    </label>
  );
};

const renderListingRow = ({ building: { street_number, route }, users, bedrooms }) => {
  return (
    <tr>
      <td className='bb bl br b--light-gray pv2'>
        {street_number + ' ' + route}
      </td>
      <td className='bb br b--light-gray pv2 pr3'>
        <ul className='pl3 mv0'>
          {
            users.map(({ gender, birthdate }) => (
              <li >
                {gender + ', born ' + new Date(birthdate).toLocaleDateString()}
              </li>
            ))
          }
        </ul>
      </td>
      <td className='bb br b--light-gray pv2 pr3'>
        <ul className='pl3 mv0'>
          {
            users.map(({ tenant_animals }) => (
              tenant_animals.map(({ species }) => (
                <li >
                  {species}
                </li>
              ))
            ))
          }
        </ul>
      </td>
      <td className='bb br b--light-gray pv2 pr3'>
        <ul className='pl3 mv0'>
          {
            bedrooms.map(({ private_bath, rent }) => (
              <li >
                {(private_bath ? 'Private Bath' : 'Shared Bath') + ', $' + rent}
              </li>
            ))
          }
        </ul>
      </td>
    </tr>
  )
};

export default App;
