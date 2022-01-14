import {getApiUrl} from './utils';
import FileModel from './fileModel'

import service from './restService';

const ENDPOINT_GET_FILES = '/file-list';
const ENDPOINT_UPLOAD_FILE = '/upload-file';
const ENDPOINT_DOWNLOAD_FILE = '/download-file/';
const ENDPOINT_DELETE_FILE = '/delete-file/';

export default {
  getFiles: async () => {
    const url = getApiUrl(ENDPOINT_GET_FILES);
    const {data} = await service.get(url);
    return data.map((item) => FileModel.fromAPI(item));
  },
  uploadFile: async (file) => {
    const url = getApiUrl(ENDPOINT_UPLOAD_FILE);

    const formData = new FormData();

    formData.append(
      'file',
      file,
      file.name,
    );
    const {status} = await service.post(url, formData);
    return status === 200;
  },
  downloadFile: async (fileId) => {
    const url = getApiUrl(ENDPOINT_DOWNLOAD_FILE + fileId);
    const {data} = await service.get(url, {
      responseType: 'blob',
      headers: {
        Accept: 'application/octet-stream'
      }
    });
    return data;
  },
  deleteFile: async (file) => {
    const url = getApiUrl(ENDPOINT_DELETE_FILE + file.id);

    const {status} = await service.get(url);
    return status === 200;
  }
};
