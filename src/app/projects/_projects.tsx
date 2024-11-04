import { Container } from "@/components/Container";
import GithubCard from "@/components/projects/github-card";
import RuleCardSkeleton from "@/components/rules/rule-card-skeleton";
import { GithubProject, RuleTemplate } from "@prisma/client";

const GITHUB_PROJECT_LIST = [
  {
    url: "https://github.com/midday-ai/v1",
    cursorFileUrl: "",
  },
  {
    url: "https://github.com/brolag/block-bounties",
    cursorFileUrl: "",
  },
  {
    url: "https://github.com/DaveMBush/SmartNgRX",
    cursorFileUrl:
      "https://raw.githubusercontent.com/DaveMBush/SmartNgRX/f39bbd104bfbbf25e7842a79468279d858b22226/.cursorrules",
  },
  {
    url: "https://github.com/ddonathan/ddonathan",
    cursorFileUrl:
      "https://raw.githubusercontent.com/ddonathan/ddonathan/refs/heads/master/.cursorrules",
  },
  {
    url: "https://github.com/penkzhou/twitter-enhanced",
    cursorFileUrl: "",
  },
  {
    url: "https://github.com/Shpigford/society-fail",
    cursorFileUrl: "",
  },
];

interface ProjectsPageProps {
  githubProjects: (GithubProject & { ruleTemplate: RuleTemplate })[];
}

const ProjectsPage = ({ githubProjects }: ProjectsPageProps) => {
  return (
    <Container className="flex w-full flex-col items-center justify-center gap-8 py-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-6 text-center">
        <h1 className="text-4xl font-medium md:text-6xl">
          Projects using Cursor
        </h1>
        <p className="text-lg text-muted-foreground md:text-xl">
          Discover how open source project using Cursor AI , making it easier to
          analyze using in projects we building
        </p>
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {githubProjects.map((project) => (
          <GithubCard
            key={project.id}
            githubProject={project}
            cursorRule={project.ruleTemplate.content}
          />
        ))}
        {/* {GITHUB_PROJECT_LIST.map((url, index) => (
          <GithubCard
            githubUrl={url.url}
            cursorFileUrl={url.cursorFileUrl}
            key={index}
          />
        ))} */}
      </div>
    </Container>
  );
};

export default ProjectsPage;
