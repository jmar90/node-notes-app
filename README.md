# Node.js Notes Application

This is a simple notes application built using Node.js.

A user can add, access, and delete notes via their terminal. Notes are saved as a .json file in project folder via fs.writeFileSync.

**Adding a Note:**  
node app.js add --title="Shopping List" --body="Toilet paper"

**Removing a Note:**
node app.js remove --title="Shopping List"

**List All Notes by Title:**  
node app.js list

**View Contents of Note:**  
node app.js read --title="Shopping List"