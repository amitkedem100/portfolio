import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasStackedMediaBlock } from "@/app/portfolio/saas/components/SaasStackedMediaBlock";
import "./SaasUserProfileSection.css";

const USER_PROFILE_VIDEO = encodeURI("/videos/Astra/user profile.mp4");

export function SaasUserProfileSection() {
  return (
    <section
      className="saas-page-section saas-user-profile project-text-section"
      aria-labelledby="saas-user-profile-title"
    >
      <div className="project-text-section-inner">
        <SaasStackedMediaBlock
          label="User Profile"
          title="Managing user identity within a structured system."
          titleId="saas-user-profile-title"
          revealText
          paragraphs={[
            "The User Profile centralizes personal details, role definition, and site associations within a clear and predictable structure.",
            "Designed for quick updates while maintaining consistency across a multi-role, multi-site environment.",
          ]}
          media={
            <div className="saas-user-profile__video-frame">
              <video
                className="saas-user-profile__video"
                src={USER_PROFILE_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Astra user profile interface"
              />
            </div>
          }
        />
      </div>
    </section>
  );
}
