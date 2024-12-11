import LoginPage from "@/app/loginpage/page";
import { getCookie } from "@/lib/cookies";

export default async function Home() {
  const session = await getCookie('session');

  return LoginPage("/homepage");
}
