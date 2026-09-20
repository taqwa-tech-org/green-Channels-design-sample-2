import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Terms" };

export default function Page() {
  return (
    <LegalPage
      title="Terms"
      sections={[
        ["Use of this website", `This website is operated by ${site.name}. By using it you agree to these terms.`],
        ["Information", "Content on this website is provided for general information about Green Channels' services. It is not an offer. Quotations are provided separately and in writing."],
        ["Certifications and claims", "Certifications shown on this website are held by the named partner factories, not by Green Channels, and are displayed only after verification."],
        ["Uploaded files", "Files you upload with a request for quotation are used only to respond to that enquiry. Do not upload material you do not have the right to share."],
      ]}
    />
  );
}
