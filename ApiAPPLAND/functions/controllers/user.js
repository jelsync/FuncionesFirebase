const admin = require('firebase-admin');
const db = admin.firestore();

const createUser = async (req, res) => {
    const { email } = req.body;
    myDate = new Date();
    // hours = myDate.getHours();
    // minutes = myDate.getMinutes();
    // seconds = myDate.getSeconds();

    const query = db.collection('user');
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;
    const response = await docs.map(doc => ({
        email: doc.data().email,
    }));

    const existe = response.find(e => e.email === email);

    if (existe) {
        return res.status(400).json({
            msg: "El email ya existe"
        });
    }
    try {
        await db.collection('user')
            .doc()
            .create({
                name: req.body.name,
                lastName: req.body.lastName,
                address: req.body.address,
                email: req.body.email,
                age: req.body.age,
                dateCreate: myDate,
                product: []
            });

        return res.status(200).json({
            msg: "Usuario Creado"
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getUserId = async (req, res) => {
    try {
        const doc = db.collection('user').doc(req.params.id);
        const result = await doc.get();
        const user = result.data();

        if (!user) {
            return res.status(400).json({
                msg: "No existe usuario"
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error);
    }
};

const getUsers = async (req, res) => {

    try {
        const { page } = req.query;
        let cantidadPagina = 0;
        let total = await cantidadRegistro();
        const query = db.collection('user');
        // const order = query.orderBy('dateCreate', 'desc').limit(10);
        const order = query.orderBy('dateCreate', 'desc');
        const querySnapshot = await order.get();
        const docs = querySnapshot.docs;
        const response = docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        cantidadPagina = Math.ceil(total / 5);
        // console.log(Math.ceil(cantidadPagina));
        return res.status(200).json({
            data: response,
            cantidadPagina,
            page: page || 1,
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

const deletUser = async (req, res) => {
    try {
        const doc = db.collection('user').doc(req.params.id);
        const result = await doc.get();
        const user = result.data();

        if (!user) {
            return res.status(400).json({
                msg: "No existe usuario"
            });
        }

        await doc.delete();
        return res.status(200).json({
            msg: 'User deleted'
        });

    } catch (error) {
        return res.status(500).send(error);
    }
};

const updateUser = async (req, res) => {
    const doc = db.collection('user').doc(req.params.id);
    const result = await doc.get();
    const user = result.data();

    if (!user) {
        return res.status(400).json({
            msg: "No existe usuario"
        });
    }

    try {
        const doc = db.collection('user').doc(req.params.id);
        await doc.update({
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            age: req.body.age
        });
        return res.status(200).json({
            msg: 'User updated'
        });
    } catch (error) {
        return res.status(500).send(error);
    }
};

const cantidadRegistro = async () => {
    let lastDoc = null;
    const query = db.collection('user');
    // const order = query.startAfter(lastDoc);

    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;
    const response = docs.map(doc => ({
        id: doc.id,
        // ...doc.data(),
        lastDoc: doc.data(),
    }));

    return response.length;
}


module.exports = {
    createUser,
    getUserId,
    getUsers,
    deletUser,
    updateUser,
};
