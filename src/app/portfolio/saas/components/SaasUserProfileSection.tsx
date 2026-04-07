import "@/app/portfolio/components/ProjectTextSection.css";
import "./SaasUserProfileSection.css";

const USER_PROFILE_VIDEO = encodeURI("/videos/Astra/user profile.mp4");

export function SaasUserProfileSection() {
  return (
    <section
      className="saas-page-section saas-user-profile project-text-section"
      aria-labelledby="saas-user-profile-title"
    >
      <div className="project-text-section-inner">
        <header className="saas-user-profile__header project-text-section-inner--prose">
          <p className="saas-user-profile__label">User Profile</p>
          <h2 id="saas-user-profile-title" className="saas-user-profile__title">
            Managing User Identity
          </h2>
        </header>

        <div className="saas-user-profile__description project-text-section-inner--prose">
          <p>
            The User Profile centralizes personal details, role definition, and site associations within a clear
            and predictable structure.
          </p>
          <p>
            Designed for quick updates while maintaining consistency across a multi-role, multi-site environment.
          </p>
        </div>

        <div className="saas-user-profile__video-wrap">
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
        </div>
      </div>
    </section>
  );
}
