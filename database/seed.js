const bcrypt = require('bcrypt');
const sequelize = require('./database');
const User = require('../models/User')(sequelize);

async function seed() {

  const users = [
    {
      nome: 'Eduardo',
      email: 'eduardo@gmail.com',
      password: '171172', 
      role: 'admin',
      matricula: '2412130074',
      curso: 'Segurança de software',
      cargaHoraria: 3600,
      semestre: 1,
    },
    {
      nome: 'Carol',
      email: 'carolinelopes@gmail.com',
      password: '123456',
      role: 'admin',
      matricula: '2412130073',
      curso: 'Engenharia de Software',
      cargaHoraria: 3000,
      semestre: 2,
    },
    {
      nome: ' Ian',
      email: ' ianmelo@gmail.com',
      password: '010203',
      role: 'admin',
      matricula: '2412130071',
      curso: 'Ciência da Computação',
      cargaHoraria: 3200,
      semestre: 3,
    },
  ];

  for (const user of users) {
    const existingUser = await User.findOne({ where: { email: user.email } });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(user.password, 10); // Criptografa a senha
      await User.create({ ...user, password: hashedPassword });
      console.log(`Usuário ${user.nome} foi criado com sucesso!`);
    } else {
      console.log(`Usuário com email ${user.email} já existe.`);
    }
  }
}
seed();
  

