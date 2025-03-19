import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { id } = req.query;

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const user = users.find((u) => u.id === parseInt(id));

    if (user) {
      res.status(200).json({ success: true, user });
    } else {
      res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }
  } else {
    res.status(405).json({ message: 'Méthode non autorisée' });
  }
}