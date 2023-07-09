// src/App.js
import React, { useEffect } from 'react';
import { DataSet, Network } from 'vis-network/standalone';
import data from './data.json';

function App() {
  const nodes = new DataSet(data.nodes.map(node => ({
    id: node.id,
    label: node.properties.name,
  })));

  const edges = new DataSet(data.relationships.map(relationship => ({
    from: relationship.start,
    to: relationship.end,
    label: relationship.type,
    arrows: 'to',  // It makes the edges directed.
  })));

  useEffect(() => {
    const container = document.getElementById('graph');
    const graphData = {
      nodes: nodes,
      edges: edges
    };
    const options = {
      nodes: {
        shape: 'circle',  // It makes the nodes round.
        color: {
          background: 'lightblue',
          border: 'grey'
        },
        font: {
          color: 'black',
          size: 20
        }
      },
      edges: {
        color: {
          color: 'grey',
          highlight: 'black'
        },
        font: {
          color: 'grey',
          size: 16,
          align: 'middle'
        },
      },
      physics: {  // It's for layout. Play around with these values for desired output.
        barnesHut: {
          gravitationalConstant: -40000,
          centralGravity: 0.3,
          springLength: 140
        }
      }
    };
    new Network(container, graphData, options);
  }, []);

  return (
    <div className="App">
      <div id="graph" style={{ height: '800px', width: '100%' }}></div>
    </div>
  );
}

export default App;
