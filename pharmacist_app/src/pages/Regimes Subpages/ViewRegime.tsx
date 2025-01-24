import { useState } from 'react';
import axios from 'axios';
import {
  IonPage,
  IonContent,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import '../../styles/Regime Subpages/ViewRegime.css';
import LowerToolbar from '../../components/LowerToolbar';
import React from 'react';
import { RegimeItem } from 'api types/types';
import RegimeItemContainer from '../../components/Regime Components/RegimeItemContainer';

const ViewRegime = () => {
	const [userId, setUserId] = useState<number>(123456);
	const [userName, setUserName] = useState('Unselected');
	const [userRegimes, setUserRegimes] = useState<RegimeItem[]>()

  async function getMockData() {
	try {
	  const { data, status } = await axios.get(
		'https://demo3553220.mockable.io/user/id/regime',
		{
		  headers: {
			Accept: 'application/json'
		  },
		},
	  );
  
	  return data;
  
	} catch (error) {
	  if (axios.isAxiosError(error)) {
		console.log('error message: ', error.message);
		return error.message;
	  } else {
		console.log('unexpected error: ', error);
		return 'An unexpected error occurred';
	  }
	}
  }

  const handleUserSelect = (user:string) => {
    console.log("This should display the medications assigned to: " + user);
    setUserName(user);
    getMockData().then(setUserRegimes);
  }

  return (
    <IonPage>
        <LowerToolbar title="Regimes"/>
			<IonContent className="ion-padding">
				<p>Select a user (currently hardcoded)</p>
				<IonSelect placeholder='Users' onIonChange={e => handleUserSelect(e.target.value)}>
					<IonSelectOption>TEST Duffy</IonSelectOption>
					<IonSelectOption>TEST Murphy</IonSelectOption>
					<IonSelectOption>TEST McMahon</IonSelectOption>
				</IonSelect>
			{
				userName == "Unselected" ? null :
				<>
					<p>Medications from API</p>
					<ul>
						{/*declaring an object that is passed entirely to the component with ...regime was a solution recieved from the answer of CPHPython 
						at https://stackoverflow.com/questions/48240449/type-is-not-assignable-to-type-intrinsicattributes-intrinsicclassattribu*/}
						{userRegimes?.map(regime => <RegimeItemContainer {...regime}/>)}
					</ul>
				</>
			}
			</IonContent>
    </IonPage>
  );
};

export default ViewRegime;
