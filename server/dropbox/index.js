import Dropbox from 'dropbox';
import { dropboxToken } from '../config';

const dbx = new Dropbox({ accessToken: dropboxToken });

export default dbx;
