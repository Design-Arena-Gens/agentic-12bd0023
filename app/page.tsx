import dynamic from "next/dynamic";
import { Suspense } from "react";
const Chat = dynamic(() => import("@/components/Chat"), { ssr: false });
const AtlasSearch = dynamic(() => import("@/components/AtlasSearch"), { ssr: false });

export default function HomePage() {
  return (
    <div className="main">
      <section className="panel">
        <h2 className="panelTitle">Chat</h2>
        <p className="small">Ask about countries: capital, population, region.</p>
        <Suspense fallback={<div className="badge">Loading chat?</div>}>
          <Chat />
        </Suspense>
      </section>
      <section className="panel">
        <h2 className="panelTitle">Atlas</h2>
        <p className="small">Quickly browse and search countries.</p>
        <Suspense fallback={<div className="badge">Loading atlas?</div>}>
          <AtlasSearch />
        </Suspense>
      </section>
    </div>
  );
}
