import { addKeyword } from "@builderbot/bot";
import axios from "axios";
import mainflow from "./mainflow";

const flowCuestionario = addKeyword('si')
    .addAnswer('¡Hola! 😊 Dime tu nombre completo:', { capture: true }, async (ctx, { flowDynamic, state }) => {
        await state.update({ nombre: ctx.body.trim() });
        await flowDynamic('¡Gracias! Ahora, comparte tu cédula o documento de identidad.');
    })
    .addAnswer('¿Cuál es tu número de cédula?', { capture: true }, async (ctx, { flowDynamic, state }) => {
        await state.update({ cedula: ctx.body.trim() });
        await flowDynamic('📞 Comparte tu número de teléfono.');
    })
    .addAnswer('Guardando tu número de teléfono...', {}, async (ctx, { flowDynamic, state }) => {
        await state.update({ telefono: ctx.from });

        const data = state.getMyState();

        // 🔹 Enviar los datos al backend
        try {
            const response = await fetch('https://bot-service-production.up.railway.app/usuarios/guardar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (!response.ok) throw new Error('Error al guardar en la base de datos');

            await flowDynamic(`🎉 Tus datos han sido guardados:\n` +
                `🧑‍💼 Nombre: ${data.nombre}\n💳 Cédula: ${data.cedula}\n📱 Teléfono: ${data.telefono}\n\n` +
                '¡Gracias por compartir tu información! 🙌');
        } catch (error) {
            await flowDynamic('❌ Hubo un error guardando los datos. Inténtalo de nuevo más tarde.');
        }
    })
    .addAnswer('¡Genial! 😊, escribe "continuar" para seguir con el proceso.',
        { capture: true },
        null,
        [mainflow]
    );

export default flowCuestionario;