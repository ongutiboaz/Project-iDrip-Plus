import { exec } from "child_process";
import util from "util";

const execAsync = util.promisify(exec);

export const startNgrok = async (port) => {
  try {
    await execAsync("taskkill /F /IM ngrok.exe").catch(() => {});

    exec(`ngrok http ${port} --authtoken=${process.env.NGROK_AUTHTOKEN}`);

    await new Promise((res) => setTimeout(res, 3000));

    const { stdout } = await execAsync(
      "curl http://127.0.0.1:4040/api/tunnels"
    );

    const data = JSON.parse(stdout);
    const httpsTunnel = data.tunnels.find(t => t.proto === "https");

    if (!httpsTunnel) throw new Error("No HTTPS tunnel");

    console.log("✅ Ngrok live:", httpsTunnel.public_url);
    return httpsTunnel.public_url;

  } catch (err) {
    console.error("❌ Ngrok error:", err.message);
    return null;
  }
};
