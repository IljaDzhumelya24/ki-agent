import { Boxes, MessageCircleMore, MonitorUp, PhoneCall } from "lucide-react";

import { homeContent } from "@/content/home";
import { SectionLabel } from "@/components/ui/section-label";

const icons = [PhoneCall, MessageCircleMore, MonitorUp, Boxes];

export function ChannelStory() {
  return (
    <section id="channels" className="relative bg-black text-white">
      <div className="page-gutter mx-auto grid max-w-[96rem] lg:grid-cols-[0.86fr_1.14fr]">
        <div className="border-white/14 py-20 lg:sticky lg:top-0 lg:h-screen lg:border-r lg:py-28 lg:pr-16">
          <SectionLabel>01 / Das System</SectionLabel>
          <h2 className="display-type mt-8 max-w-[8ch] text-[clamp(4.4rem,8.2vw,8.8rem)] leading-[0.83] font-medium tracking-[-0.065em]">
            Vier Türen. Ein Gehirn.
          </h2>
          <p className="mt-10 max-w-md text-sm leading-7 text-white/55 md:text-base">
            Der Kunde wählt den Kanal. Der Betrieb pflegt nur einen Agenten - mit einer Wissensbasis, einem Regelwerk und klarer Übergabe.
          </p>
          <div className="mt-10 flex items-center gap-3 font-mono text-[0.58rem] uppercase tracking-[0.16em] text-white/45">
            <span className="size-2 rounded-full bg-white" />
            Ein System / vier Zugänge
          </div>
        </div>

        <div className="lg:pl-16">
          {homeContent.channels.map((channel, index) => {
            const Icon = icons[index];
            return (
              <article
                key={channel.id}
                data-channel={channel.id}
                data-scroll-reveal
                className="group grid min-h-[52vh] content-center border-t border-white/14 py-16 first:border-t-0 lg:min-h-[58vh] lg:grid-cols-[8rem_1fr] lg:gap-10"
              >
                <div className="mb-8 flex items-center justify-between lg:mb-0 lg:flex-col lg:items-start lg:justify-start lg:gap-5">
                  <span className="font-mono text-xs text-white/45">{channel.index}</span>
                  <div className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/[0.06] transition-colors duration-500 group-hover:bg-white group-hover:text-black">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white/45">
                    <span>{channel.label}</span>
                    <span className="h-px w-8 bg-white/25" />
                    <span>Aktiv</span>
                  </div>
                  <h3 className="display-type mt-5 text-[clamp(3.5rem,7vw,7rem)] leading-none font-medium">{channel.name}</h3>
                  <p className="mt-7 max-w-xl text-xl leading-snug text-white/85 md:text-2xl">{channel.promise}</p>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-white/48">{channel.detail}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
