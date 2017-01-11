import Dropbox from 'dropbox';
import { dropboxToken } from '../config/private';

const dbx = new Dropbox({ accessToken: dropboxToken });

export default dbx;
