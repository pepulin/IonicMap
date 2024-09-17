import React, { useEffect, useState, useRef } from 'react';
import { useIonRouter } from '@ionic/react';
import { IonDatetime, IonModal, IonPage, IonInput, IonLabel, IonContent, IonItem, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from '@ionic/react';
import { GoogleMap } from '@capacitor/google-maps';

const Home: React.FC = () => {
  const router = useIonRouter();
  const mapRef = useRef<HTMLElement>();

  useEffect(() => {
    initMap()
  }, []);

  async function initMap() {
    if (!mapRef.current) return;
    
    const map = await GoogleMap.create({
      id: 'my-cool-map',
      element: mapRef.current,
      apiKey: "YOUR_API_KEY",
      config: {
        center: {
          lat: 40.66699789849323,
          lng: -3.9940652846557652,
        },
        zoom: 10,
        mapTypeId: 'satellite'
      }
    })
    await map.setOnMarkerClickListener((markerClickData) => {
      const clickedMarker = markerClickData.markerId;
      console.log('Clicked marker: ' + clickedMarker)
    });
    //Add marker
    let id = await map.addMarker({
      coordinate: {
        lat: 40.66699789849323,
        lng: -3.9940652846557652
      },
      title: 'My Marker',
      snippet: 'This is a custom marker with tintColor',
      tintColor: { r: 60, g: 179, b: 113, a: 0 }
    });
  }

  return (
    <IonContent> 
      <IonCard style={{ height: '100%' }}>
        <IonCardContent style={{ height: '100%' }}>
          <capacitor-google-map ref={mapRef} style={{
            display: 'inline-block',
            width: '100%',
            height: '100%'
          }}></capacitor-google-map>
        </IonCardContent>
      </IonCard>
    </IonContent>
  );
};

export default Home;
