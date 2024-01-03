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
import SearchPage from "../pages/SearchPage";

export const config: TemplateConfig = {
  name: "search",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `search.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
}): HeadConfig => {
  return {
    title: "UMASS | Search",
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

const SearchWrapper: Template<
  TemplateRenderProps
> = ({}: TemplateRenderProps) => {
  return (
    <PageLayout>
      <div className="centered-container">
        <SearchPage />
      </div>
    </PageLayout>
  );
};
export default SearchWrapper;
