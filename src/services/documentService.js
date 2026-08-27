import { initialMockDocuments } from '../data/mockDocuments';

const DOCS_STORAGE_KEY = 'amchi_documents_vault';

export const documentService = {
  getDocuments: () => {
    const stored = localStorage.getItem(DOCS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(initialMockDocuments));
      return initialMockDocuments;
    }
    return JSON.parse(stored);
  },

  uploadDocument: (docData) => {
    const list = documentService.getDocuments();
    const newDoc = {
      id: `DOC-${Math.floor(1000 + Math.random() * 9000)}`,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      ...docData
    };
    list.unshift(newDoc);
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(list));
    return newDoc;
  },

  deleteDocument: (id) => {
    let list = documentService.getDocuments();
    list = list.filter((d) => d.id !== id);
    localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(list));
    return true;
  },

  replaceDocument: (id, docData) => {
    const list = documentService.getDocuments();
    const index = list.findIndex((d) => d.id === id);
    if (index !== -1) {
      list[index] = {
        ...list[index],
        ...docData,
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'ACTIVE'
      };
      localStorage.setItem(DOCS_STORAGE_KEY, JSON.stringify(list));
      return list[index];
    }
    return null;
  }
};
