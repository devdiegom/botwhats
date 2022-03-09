// Supports ES6
import { create, Whatsapp, CreateOptions } from 'venom-bot';
const { NlpManager } = require('node-nlp');
const manager = new NlpManager({ languages: ['pt'], forceNER: true });
// Adds the utterances and intents for the NLP
manager.addDocument('pt', 'bom dia', 'SAUDACAO');
manager.addDocument('pt', 'boa tarde', 'SAUDACAO');
manager.addDocument('pt', 'boa noite', 'SAUDACAO');
manager.addDocument('pt', 'e ae tudo bem', 'SAUDACAO');
manager.addDocument('pt', 'ola', 'SAUDACAO');
manager.addDocument('pt', 'oi', 'SAUDACAO');
manager.addDocument('pt', 'ooi', 'SAUDACAO');
manager.addDocument('pt', 'tudo bem', 'SAUDACAO');

// TREINO PEDIDO
manager.addDocument('pt', 'gostaria de fazer um pedido', 'PEDIDO');
manager.addDocument('pt', 'como faco para pedir', 'PEDIDO');
manager.addDocument('pt', 'quero fazer um pedido', 'PEDIDO');
manager.addDocument('pt', 'posso pedir por aqui', 'PEDIDO');
manager.addDocument('pt', 'quero pedir um hamburguer', 'PEDIDO');

//TREINO HORARIO
manager.addDocument('pt', 'qual o horario de funcionamento', 'HORARIO');
manager.addDocument('pt', 'estao aberto', 'HORARIO');
manager.addDocument('pt', 'abre que horas ', 'HORARIO');
manager.addDocument('pt', 'ainda estao funcionando', 'HORARIO');
manager.addDocument('pt', 'posso pedir ate que horas', 'HORARIO');
manager.addDocument('pt', 'que horas vcs fecham', 'HORARIO');

//TREINO CARDAPIO
manager.addDocument('pt', 'qual o cardapio', 'CARDAPIO');
manager.addDocument('pt', 'pode me enviar o cardapio de vcs', 'CARDAPIO');
manager.addDocument('pt', 'tem o cardapio', 'CARDAPIO');
manager.addDocument('pt', 'o que vcs vendem', 'CARDAPIO');
manager.addDocument('pt', 'qual o valor do hamburguer', 'CARDAPIO');
manager.addDocument('pt', 'qual o valor do Xis', 'CARDAPIO');

//treino localização
manager.addDocument('pt', 'qual o endereco', 'LOCALIZACAO');
manager.addDocument('pt', 'qual a localizacao', 'LOCALIZACAO');
manager.addDocument('pt', 'onde fica', 'LOCALIZACAO');
manager.addDocument('pt', 'ponto de referencia', 'LOCALIZACAO');

// RESPOSTAS SAUDAÇÃO
manager.addAnswer('pt','SAUDACAO','Olá sou o Atendente virtual, vou te atender hoje!');
manager.addAnswer('pt','SAUDACAO','Olá sou o Diletinhos, estou aqui pra te ajudar!');

// RESPOSTAS LOCALIZAÇÃO
manager.addAnswer('pt', 'LOCALIZACAO','Nosso endereço é rua Itararé 333, Bela vista!');

// RESPOSTAS LOCALIZAÇÃO
manager.addAnswer('pt', 'HORARIO','Nosso Horário de Funcionamento é: Terça a Quinta das 14H as 02H, Sexta e Sábado das 11:30H as 03H da Manha!');

// RESPOSTAS PEDIDO
manager.addAnswer('pt', 'PEDIDO','Você pode pedir direto pelo nosso site! https://diletosburguer.pedzap.com.br');
manager.addAnswer('pt', 'PEDIDO','Peça diretamente pelo site! https://diletosburguer.pedzap.com.br');

// RESPOSTAS CARDAPIO
manager.addAnswer('pt', 'CARDAPIO','Só clicar no link e acessar o nosso cardápio. https://diletosburguer.pedzap.com.br');
manager.addAnswer('pt', 'CARDAPIO','Já estou enviando o nosso cardápio, acesse agora https://diletosburguer.pedzap.com.br');
var lanche = "";
var obs = "";
var endereco = "";

// Train and save the model.
(async() => {
    await manager.train();
    manager.save()
    create({
      session: 'BOT', //name of session
      multidevice: true// for version not multidevice use false.(default: true)
      
    })
    .then((client) => {
      
      client.onMessage(async(message) => {
        
        if (message.isGroupMsg === false) {

          const response = await manager.process('pt', message.body.toLowerCase());

         if(response.intent === 'None'){
         client.sendText(message.from, "Desculpe não entendi a sua pergunta! :(")

         }else  {
            client.sendText(message.from, response.answer)  
          }
          console.log("Intenção:", response.intent);
          console.log("Precisão:", response.score);
          
        }
      });
    })
    Promise.reject()
    .catch((erro) => {
      console.log(erro);
    });
   
})();
 
