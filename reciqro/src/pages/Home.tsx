import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonLoading } from '@ionic/react';
import React, {useState} from 'react';
//import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

type AnyReactComponentProps = {
  text: string,
  lat: number,
  lng: number
}

const AnyReactComponent = ({ text  }: AnyReactComponentProps) => <button>{text}</button>
;

const Home: React.FC = () => {
 const [puntos, setPuntos] = useState([]);
   
    React.useEffect(() => {
     axios.get("http://10.25.90.121:3007/centrosdeacopio")
      .then(res => {
       setPuntos(res.data);
      })
    },[setPuntos]);

  if (puntos===[])
  {
     return (
       <IonContent>
     
      <IonLoading
        isOpen={true}
        message={'Please wait...'}
       // duration={5000}
      />
    </IonContent>
    );
  }
  else
  {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAOdynB-jRfE0ezIipEABEpnPLcAc5sLsM" }}
           defaultCenter={{lat: 20.5724372,lng: -100.3820308}}
          defaultZoom={11}
        >
        {
         
          puntos.map( (punto,i) => 
            <AnyReactComponent
             key={i} 
            lat={punto["lng"]}
            lng={punto["lat"]}
            text="My Marker"
          />
           )
         
        }
          
        </GoogleMapReact>
      </div>
      </IonContent>
    </IonPage>
  );}
};

export default Home;
