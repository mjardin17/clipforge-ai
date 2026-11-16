"use client";
import React, { useState } from "react";
import { Film, Scissors, Sparkles, UploadCloud, Layers3, Share2, CalendarDays, Settings2, Search, Bell, ChevronRight, Clock3, CirclePlay, Plus, ArrowUpRight, Check, Youtube, Instagram, Music2, Facebook, Video, Captions, WandSparkles } from "lucide-react";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { FileDropzone } from "../components/FileDropzone";
import styles from "./_index.module.css";

const destinations = [
  { id: "youtube", name: "YouTube Shorts", detail: "Vertical videos up to 3 minutes", icon: Youtube },
  { id: "tiktok", name: "TikTok", detail: "Short-form video publishing", icon: Music2 },
  { id: "instagram", name: "Instagram Reels", detail: "Reels publishing for eligible accounts", icon: Instagram },
  { id: "facebook", name: "Facebook Reels", detail: "Reels publishing for eligible Pages", icon: Facebook },
  { id: "pinterest", name: "Pinterest video", detail: "API availability and account access to verify", icon: Video },
  { id: "linkedin", name: "LinkedIn video", detail: "Native video posts; short-form format varies", icon: Video },
];

export default function HomePage() {
  const [activeNav, setActiveNav] = useState("Overview");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedTargets, setSelectedTargets] = useState<string[]>(["youtube", "tiktok", "instagram", "facebook"]);
  const [showTargets, setShowTargets] = useState(false);

  const toggleTarget = (id: string) => setSelectedTargets(current => current.includes(id) ? current.filter(x => x !== id) : [...current, id]);

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}><div className={styles.brandMark}><Scissors size={19} strokeWidth={2.5}/></div><div><strong>clipforge</strong><span>CREATOR STUDIO</span></div></div>
        <div className={styles.workspaceLabel}>WORKSPACE</div>
        <div className={styles.workspace}><div className={styles.workspaceAvatar}>J</div><div><strong>My workspace</strong><small>Personal studio</small></div><ChevronRight size={15}/></div>
        <div className={styles.navLabel}>STUDIO</div>
        {[
          {label:"Overview",icon:Layers3},{label:"My projects",icon:Film},{label:"Clip editor",icon:Scissors},{label:"Publishing",icon:Share2},{label:"Schedule",icon:CalendarDays}
        ].map(item => <button key={item.label} className={activeNav===item.label?styles.navActive:styles.navItem} onClick={()=>setActiveNav(item.label)}><item.icon size={17}/><span>{item.label}</span>{item.label==="Publishing"&&<span className={styles.navDot}/>}</button>)}
        <div className={styles.sidebarBottom}><button className={styles.navItem} onClick={()=>setActiveNav("Settings")}><Settings2 size={17}/><span>Settings</span></button><div className={styles.helpCard}><Sparkles size={16}/><strong>Your next great clip starts here.</strong><span>Turn long videos into scroll-stopping shorts.</span></div><div className={styles.profile}><div className={styles.profileAvatar}>JJ</div><div><strong>Creator account</strong><small>Free workspace</small></div><Settings2 size={15}/></div></div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}><div className={styles.breadcrumb}>Studio <span>/</span> {activeNav}</div><div className={styles.topActions}><button className={styles.iconButton} aria-label="Search"><Search size={18}/></button><button className={styles.iconButton} aria-label="Notifications"><Bell size={18}/></button><div className={styles.topAvatar}>JJ</div></div></header>
        <div className={styles.content}>
          <div className={styles.pageIntro}><div><div className={styles.eyebrow}>YOUR CONTENT WORKFLOW</div><h1>Make every moment <em>count.</em></h1><p>From one long video to a library of ready-to-publish shorts.</p></div><Badge variant="outline">EARLY ACCESS WORKSPACE</Badge></div>

          <section className={styles.uploadPanel}>
            <div className={styles.uploadCopy}><div className={styles.uploadIcon}><UploadCloud size={21}/></div><div><h2>Start with a video</h2><p>Upload a source video to find the moments worth sharing.</p></div></div>
            <FileDropzone accept="video/mp4,video/quicktime,video/webm,video/x-matroska" maxFiles={1} maxSize={100*1024*1024} onFilesSelected={(files)=>setSelectedFile(files[0]??null)} title="Drop your video here, or browse files" subtitle="MP4, MOV, WEBM · Up to 100 MB in this first upload flow" />
            {selectedFile && <div className={styles.fileSelected}><div className={styles.fileIcon}><Film size={17}/></div><div><strong>{selectedFile.name}</strong><small>{(selectedFile.size/1024/1024).toFixed(1)} MB · Selected, not uploaded yet</small></div><button onClick={()=>setSelectedFile(null)}>Remove</button></div>}
            <div className={styles.uploadFoot}><span><Check size={14}/> Your original stays untouched</span><span><Check size={14}/> Private project storage</span><span><Check size={14}/> You approve every publish</span></div>
            <Button disabled={!selectedFile} onClick={()=>setShowTargets(true)} className={styles.continueButton}>Continue to clip setup <ArrowUpRight size={16}/></Button>
          </section>

          <div className={styles.sectionHead}><div><div className={styles.eyebrow}>DISTRIBUTION</div><h2>One edit. Multiple destinations.</h2><p>Choose where your finished clips should go.</p></div><Button variant="outline" size="sm" onClick={()=>setShowTargets(!showTargets)}>Manage destinations <ChevronRight size={15}/></Button></div>
          <section className={styles.destinations}>
            {destinations.map((d, index)=>{const Icon=d.icon;const active=selectedTargets.includes(d.id);return <button key={d.id} className={active?styles.destinationActive:styles.destination} onClick={()=>toggleTarget(d.id)}><div className={styles.destinationIcon}><Icon size={19}/></div><div className={styles.destinationText}><strong>{d.name}</strong><small>{d.detail}</small></div><span className={active?styles.checked:styles.unchecked}>{active&&<Check size={13}/>}</span></button>})}
          </section>
          <div className={styles.distributionNote}><div className={styles.noteIcon}><Share2 size={17}/></div><div><strong>Direct publishing is integration-dependent.</strong><p>YouTube, TikTok, Instagram and Facebook require account authorization and may require app review or account eligibility. Other destinations will be added only where official publishing access exists. If direct publishing is unavailable, ClipForge will provide a correctly formatted export and clear posting instructions.</p></div></div>

          <div className={styles.sectionHead}><div><div className={styles.eyebrow}>YOUR STUDIO</div><h2>Everything in one place.</h2></div></div>
          <div className={styles.workflowGrid}>
            <div className={styles.workflowCard}><div className={styles.workflowIcon}><Captions size={18}/></div><div><strong>Accurate captions</strong><p>Transcribe, style and time subtitles.</p></div><Badge variant="outline">STEP 02</Badge></div>
            <div className={styles.workflowCard}><div className={styles.workflowIcon}><WandSparkles size={18}/></div><div><strong>Smart clip selection</strong><p>Review suggested moments and edit the cuts.</p></div><Badge variant="outline">STEP 03</Badge></div>
            <div className={styles.workflowCard}><div className={styles.workflowIcon}><Share2 size={18}/></div><div><strong>Publish & track</strong><p>Approve destinations and track real post results.</p></div><Badge variant="outline">STEP 04</Badge></div>
          </div>
          <div className={styles.emptyProjects}><div className={styles.emptyIcon}><CirclePlay size={23}/></div><div><strong>Your project library is ready</strong><p>Uploaded videos and finished clips will appear here. No projects yet.</p></div><span><Clock3 size={14}/> No activity yet</span></div>
          <footer className={styles.footer}><span>CLIPFORGE AI <i>·</i> CREATOR WORKFLOW</span><span>Built for creators. Designed for distribution.</span></footer>
        </div>
      </main>
      {showTargets && <div className={styles.modalBackdrop} onClick={()=>setShowTargets(false)}><section className={styles.targetModal} onClick={e=>e.stopPropagation()}><button className={styles.modalClose} onClick={()=>setShowTargets(false)}>×</button><div className={styles.eyebrow}>DESTINATION SETUP</div><h2>Where should your clips go?</h2><p>Select your target platforms. Account connection and direct publishing setup will be completed in the integrations stage.</p><div className={styles.modalTargets}>{destinations.map(d=>{const Icon=d.icon;return <button key={d.id} className={selectedTargets.includes(d.id)?styles.modalTargetActive:styles.modalTarget} onClick={()=>toggleTarget(d.id)}><Icon size={18}/><span>{d.name}</span>{selectedTargets.includes(d.id)?<Check size={16}/>:<Plus size={16}/>}</button>})}</div><Button className={styles.modalSave} onClick={()=>setShowTargets(false)}>Save destinations ({selectedTargets.length})</Button></section></div>}
    </div>
  );
}