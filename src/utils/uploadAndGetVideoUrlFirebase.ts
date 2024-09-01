import { initializeApp } from 'firebase/app';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

interface IUploadAndGetVideoUrlFirebase {
  video: File;
  slugAtividade: string;
  slugParceiro: string;
}

export default async function uploadAndGetVideoUrlFirebase({
  video,
  slugAtividade,
  slugParceiro,
}: IUploadAndGetVideoUrlFirebase) {
  try {
    const firebaseConfig = {
      apiKey: 'AIzaSyDJbIwdGMudiQeD8LSUZId3sXF5DrIH7PA',
      authDomain: 'kiddle-pass.firebaseapp.com',
      databaseURL: 'https://kiddle-pass.firebaseio.com/',
      projectId: 'kiddle-pass',
      storageBucket: 'kiddle-pass.appspot.com',
      messagingSenderId: '994524208152',
      appId: '1:994524208152:web:02a190e6f639f6af',
      measurementId: 'G-8GY109G2Q4',
    };
    initializeApp(firebaseConfig);

    const videoStorageRef = ref(
      getStorage(),
      `activities-files/${slugParceiro}/${slugAtividade}/${video.name}`,
    );

    console.log('vai iniciar snapshot');
    const snapshot = await uploadBytes(
      videoStorageRef,
      video,
    );
    console.log('finalizou snapshot');

    const finalVideoUrl = await getDownloadURL(snapshot.ref);
    console.log('URL', finalVideoUrl);

    return finalVideoUrl;
  } catch (error) {
    console.log(error);
    return '';
  }
}
