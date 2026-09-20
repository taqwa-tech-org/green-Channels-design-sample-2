import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      sections={[
        ["Who we are", `${site.name}, ${site.address.join(", ")}. Contact: ${site.email}.`],
        ["What we collect", "When you submit a request for quotation we collect the details you enter (name, company, email, phone, country, website and product information) and any files you attach."],
        ["How we use it", "We use this information only to respond to your enquiry and to manage the resulting business relationship. We do not sell personal data."],
        ["Your rights", "If you are in the EU or UK you have the right to access, correct, delete or restrict the use of your personal data. Write to us at the address above."],
        ["Retention", "Enquiry data is kept only as long as needed for the purpose above, or as required by law."],
      ]}
    />
  );
}
