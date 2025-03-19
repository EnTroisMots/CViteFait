import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      res.status(200).json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Identifiants incorrects' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}