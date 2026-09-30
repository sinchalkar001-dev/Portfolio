import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-2 py-8 text-[14px] text-faint sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Sinchal Kar</p>
        <p>Built with React, Vite and Tailwind CSS</p>
        <a href="#top" className="inline-flex h-11 items-center self-start transition-colors duration-200 hover:text-peer sm:self-auto">
          Back to top
        </a>
      </Container>
    </footer>
  );
}
