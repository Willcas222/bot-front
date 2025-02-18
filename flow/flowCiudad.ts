import { addKeyword } from "@builderbot/bot";
import flowCierre from "./flowCierre";

const WAITING_TIME = Number(process.env.WAITING_TIME);

const flowCiudad = addKeyword(['2','ciudad'])
.addAnswer(
    '¡Genial! 😊 Para continuar, dime en qué ciudad te encuentras.',
    { capture: true, idle: WAITING_TIME },
    async (ctx, { flowDynamic, gotoFlow, state }) => {
        if (!ctx.body || ctx.body.trim() === '') {
            await flowDynamic('⏳ Parece que pasó el tiempo sin que ingresaras tu ciudad. No te preocupes, puedes intentarlo de nuevo cuando quieras. ¡Aquí estaré! 😊');
            return gotoFlow(flowCierre, 0);
        } else {
            await state.update({ ciudad: ctx.body });
            const data = state.getMyState();
            await flowDynamic([
                `¡Gracias! 🎉 Nos encanta saber que eres de ${data.ciudad}.`,
                'Si quieres más información, por favor completa este formulario:',
                '📋 [Haz clic aquí](https://forms.office.com/r/eLMu9U6ajF)',
                'Estamos felices de contar contigo. ¡Nos hablamos pronto! 😊'
            ]);
        }
    },
);


export default flowCiudad