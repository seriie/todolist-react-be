import User from "../model/user.model";

export const seedUser = async () => {
    const existing = await User.findOne({ where: { email: 'nobara@domain.com' } })
    if(existing) {
        console.log("Dummy user already exist");
        return;
    }
    
    await User.create({
        name: 'nobara',
        email: 'nobara@domain.com',
        password: 'hashedpw123',
        role: 'user',
    });
    
    console.log("Dummy user seeded");
}
