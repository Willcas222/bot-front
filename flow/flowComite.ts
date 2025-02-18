import { addKeyword } from "@builderbot/bot";
import flowCierre from "./flowCierre";
import flowLocalidad from "./flowLocalidad";
import flowCiudad from "./flowCiudad";


const WAITING_TIME = Number(process.env.WAITING_TIME);


const flowComite = addKeyword (['1','Comite','comite'])
.addAnswer(
    '¡Qué emoción! 🎉 Para continuar, cuéntame, ¿en qué ciudad vives?\n\n' +
    '1️⃣ Bogotá: ¿Cuál es tu localidad?\n' +
    '2️⃣  otra.\n',
    { capture: true, idle:WAITING_TIME },
    async (ctx, { flowDynamic, gotoFlow }) => {
        if (!ctx.body || ctx.body.trim() === '') {
            await flowDynamic('⏳ Parece que el tiempo se agotó sin recibir una respuesta. ¡No pasa nada! Cuando estés listo, vuelve a intentarlo. 😊');
            return gotoFlow(flowCierre, 0);
        } else {
            await flowDynamic('¡Muchas gracias por compartir tu ciudad con nosotros! 💙')
        }
    },
    [flowLocalidad,flowCiudad]
);

export default flowComite
