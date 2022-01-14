import {nanoid} from "nanoid";

export default {

  fields: {
    id: nanoid(),
    fileName: '',
    date: ''
  },

  getDefaults() {
    return ({...this.fields});
  },

  fromAPI: (rawData) => ({
    id: rawData.id,
    fileName: rawData.fileName,
    date: rawData.date
  }),

  toAPI: (rawData) => ({
    fileName: rawData.fileName,
    date: rawData.date
  })
};
