import { readFileSync } from 'fs';

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { storage } from '../config/firebase';

export async function uploadAvatar(file: any, id: string): Promise<string> {
  // generate random user avatar if needed
  const image = file
    ? readFileSync(file.path)
    : await import('jdenticon').then(({ toPng }) => toPng(id, 200));

  const storageRef = ref(
    storage,
    `/files/${file?.newFilename || `random-avatar-${Date.now()}`}.${
      file?.mimetype?.split('/')[1] || 'png'
    }`
  );

  const uploadTask = uploadBytesResumable(storageRef, image);
  await uploadTask;
  const avatar = await getDownloadURL(uploadTask.snapshot.ref);
  return avatar;
}
