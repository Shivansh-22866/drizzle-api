import { Router } from "express";
import { createUserSchema, loginSchema, usersTable } from "../../db/userSchema.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import bcrypt from 'bcryptjs'
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'

const router = Router()

const generateUserToken = (user: any) => {
    return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '30d',
    });
  };

router.post('/register', validateData(createUserSchema), async (req, res) => {
    try {
        const data = req.cleanBody
        data.password = await bcrypt.hash(data.password, 10)
    
        const [user] = await db.insert(usersTable).values(data).returning()

        const {password, ...rest} = user
        
        res.status(201).json({"User": rest})
    }

    catch(e) {
        res.status(500).json({error: e})
    }
})

router.post('/login', validateData(loginSchema), async (req, res) => {
    try {
        const { email, password } = req.cleanBody;
    
        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email));
        if (!user) {
          res.status(401).json({ error: 'Authentication failed' });
          return;
        }
    
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) {
          res.status(401).json({ error: 'Authentication failed' });
          return;
        }
    
        // create a jwt token
        const token = generateUserToken(user);
        // @ts-ignore
        delete user.password;
        res.status(200).json({ token, user });

      } catch (e) {
        res.status(500).send('Something went wrong');
      }
})

export default router