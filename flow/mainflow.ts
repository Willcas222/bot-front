import { addKeyword, EVENTS } from "@builderbot/bot";
import flowComite from "./flowComite";
import flowCierre from "./flowCierre";
import flowNoComite from "./flowNoComite";

const WAITING_TIME = Number(process.env.WAITING_TIME)

const mainflow = addKeyword(['no','continuar'])
    .addAnswer(
        '🌟 ¡Bienvenido!, Nos encantaría que formes parte de nuestro equipo.',
        {
            idle: WAITING_TIME
        },
        async (ctx,{flowDynamic,state})=>{
            await state.update({name: ctx.body})
            const data = state.getMyState()
            
        }
    )
    .addAnswer(
        '✨ ¡Hola!, Nos emociona que estés aquí. Por favor, elige una opción para continuar: \n\n' +
        '1️⃣ Quiero ser parte del comité organizador. 🏆\n' +
        '2️⃣ No quiero ser parte del comité, pero me gustaría ayudar. 🤝\n' +
        '3️⃣ No quiero participar en esta ocasión. 😊',
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow }) => {
            const option = ctx.body.trim();
            
            if (option === '1') {
                await flowDynamic('🎉 ¡Qué emoción! Estamos felices de contar contigo.');
            } else if (option === '2') {
                await flowDynamic('🙏 ¡Muchas gracias por tu disposición! Enseguida te contamos cómo puedes ayudarnos.');
            } else if (option === '3') {
                await flowDynamic('😊 ¡No hay problema! Agradecemos tu tiempo. Si en algún momento cambias de opinión, estaremos felices de recibirte. 💌');
            } else {
                await flowDynamic('⚠️ Parece que ingresaste una opción no válida. ¡Intenta de nuevo! 😊')
                return gotoFlow(flowCierre);
            }
        },

        [flowComite,flowNoComite]
    );

export default mainflow;