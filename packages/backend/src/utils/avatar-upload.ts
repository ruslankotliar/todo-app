import { readFileSync } from 'fs';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// import PersistentFile from 'formidable/PersistentFile';

import { File } from 'formidable';
import { storage } from '../config/firebase';

export async function uploadAvatar(file: File | undefined, id: string): Promise<string> {
  // generate random user avatar
  if (!file) {
    const avatar = await import('jdenticon').then(({ toSvg }) => {
      const svgString = toSvg(id, 100);
      const base64 = window.btoa(svgString);
      return `data:image/svg+xml;base64,${base64}`;
    });
    return avatar;
  }

  const storageRef = ref(storage, `/files/${file.newFilename}.${file.mimetype?.split('/')[1]}`);
  const uploadTask = uploadBytesResumable(storageRef, readFileSync(file.filepath));
  await uploadTask;
  const avatar = await getDownloadURL(uploadTask.snapshot.ref);
  return avatar;
}
