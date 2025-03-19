import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { firstName, lastName, email, password } = req.body;

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    // Vérifier si l'email existe déjà
    const userExists = users.some((u) => u.email === email);

    if (userExists) {
      res.status(400).json({ success: false, message: 'Cet email est déjà utilisé' });
    } else {
      // Générer un nouvel ID
      const newUser = {
        id: users.length + 1, // ID unique basé sur la longueur du tableau
        firstName,
        lastName,
        email,
        password,
      };

      users.push(newUser);
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      res.status(201).json({ success: true });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}