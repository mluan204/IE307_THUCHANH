import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('notes.db');

export const CreateTable = () => {
  db.transaction(tx => {
    tx.executeSql('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT);');
    tx.executeSql('CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY, darkMode BOOLEAN, fontSize INT);');
  });
};
// Thạch Minh Luân - 22529827
export const GetNotes = (setNotes) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM notes;',
      [],
      (txObj, resultSet) => setNotes(resultSet.rows._array), 
      (txObj, error) => console.log("Error fetching notes", error)
    );
  });
};

export const insertNote = (title, content, callback) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO notes (title, content) VALUES (?, ?);', [title, content], 
      (txObj, resultSet) => callback(), 
      (txObj, error) => console.log("Error inserting note", error)
    );
  });
};

export const updateNote = (id, title, content, callback) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE notes SET title = ?, content = ? WHERE id = ?;', [title, content, id], callback);
  });
};

export const deleteNote = (id) => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM notes WHERE id = ?;', [id]);
  });
};

export const GetSettings = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM settings WHERE id = 1;', [], (_, result) => {
      callback(result.rows._array[0]);
    });
  });
};
// Thạch Minh Luân - 22529827
export const insertSetting = (darkMode, fontSize, callback) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO settings (id, darkMode, fontSize) VALUES (?, ?, ?);', [1, darkMode, fontSize], (_, result) => {
      callback(result.rows._array[0]);
    });
  });
};

export const updateSettings = (darkMode, fontSize, callback) => {
  db.transaction(tx => {
    tx.executeSql('UPDATE settings SET darkMode = ?, fontSize = ? WHERE id = 1;', [darkMode, fontSize], 
      (_, result) => callback());
  });
};
