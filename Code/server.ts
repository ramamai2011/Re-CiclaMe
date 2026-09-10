import express = require("express"); 
import type { Request, Response } from "express"; 

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/api/register/button", (req: Request, res: Response) => {
    
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
