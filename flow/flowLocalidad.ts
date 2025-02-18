import { addKeyword } from "@builderbot/bot";
import flowCierre from "./flowCierre";

const WAITING_TIME = Number(process.env.WAITING_TIME);

const flowLocalidad = addKeyword(['1','localidad'])
.addAnswer(
    '📍 ¡Genial! Para continuar, dime en qué localidad te encuentras. ✍️😊',
    { capture: true, idle: WAITING_TIME },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
        if (!ctx.body || ctx.body.trim() === '') {
            await flowDynamic('⏳ Parece que el tiempo se agotó sin recibir una respuesta. No te preocupes, puedes intentarlo de nuevo cuando estés listo. ¡Te esperamos! 😊');
            return gotoFlow(flowCierre, 0);
        } else {
            await state.update({ localidad: ctx.body });
            const data = state.getMyState();
            await flowDynamic([
                `✨ ¡Gracias! Tu localidad *${data.localidad}* es muy importante para nosotros. 💙`,
                'Para brindarte más información, por favor completa este formulario: 📋👇',
                '[Formulario](https://forms.office.com/r/eLMu9U6ajF)'
            ]);
        }
    },
);


export default flowLocalidad