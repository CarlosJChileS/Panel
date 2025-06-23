const React = require('react');
module.exports = {
  MapContainer: ({children}) => React.createElement('div', null, children),
  TileLayer: () => React.createElement('div'),
  Marker: () => React.createElement('div'),
};
