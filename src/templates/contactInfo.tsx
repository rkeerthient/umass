/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import ContactInfoPage from "../pages/VendorsPage";

export const config: TemplateConfig = {
  name: "contactInfo",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `contactInfo`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  document,
}): HeadConfig => {
  return {
    title: "Verizon | contactInfo",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: relativePrefixToRoot,
        },
      },
    ],
  };
};

const ContactInfoWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <ContactInfoPage />
        </div>
      </PageLayout>
    </>
  );
};
export default ContactInfoWrapper;
