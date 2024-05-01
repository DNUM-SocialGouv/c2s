import { OcAccueilTuiles } from './ocAccueilTuiles/OcAccueilTuiles';
import { OcAccueilCitation } from './ocAccueilCitation/OcAccueilCitation';
import { OcAccueilHeader } from './ocAccueilHeader/OcAccueilHeader';
import './OcAccueil.css';
import { Separator } from '../common/svg/Seperator';
import { OcAccueilLinks } from './ocAccueilLinks/OcAccueilLinks';
import { useEffect } from 'react';

export const OcAccueil = () => {
  useEffect(() => {
    fetch('http://localhost:8081/api/partenaire/welcome', {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      },
    })
      .then((response) => response)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="fr-container--fluid">
      <OcAccueilHeader />
      <Separator />
      <OcAccueilCitation content={''} updateDate={''} />
      <Separator />
      <OcAccueilTuiles />
      <OcAccueilLinks />
    </div>
  );
};
