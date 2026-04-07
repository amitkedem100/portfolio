import Image from "next/image";
import "@/app/portfolio/components/ProjectTextSection.css";
import "./SaasAccessSettingsSection.css";

/* Add assets under public/images/saas and public/videos/Astra when ready */
const USER_MANAGEMENT_IMG = "/images/saas/user-management-table.png";
const SYSTEM_CONFIGURATION_VIDEO = encodeURI("/videos/Astra/system-configuration-overview.mp4");

/* Two-part block: user management (image) + system settings (video), Basilar-style text + media; no “Account Settings” title */
export function SaasAccessSettingsSection() {
  return (
    <section
      className="saas-page-section saas-access-settings project-text-section"
      aria-label="User management and system configuration"
    >
      <div className="project-text-section-inner">
        <div className="saas-access-settings__segments">
          <article
            className="saas-access-settings-segment"
            aria-labelledby="saas-access-user-mgmt-title"
          >
            <div className="saas-access-settings__body">
              <p className="saas-access-settings__label">User Management</p>
              <h2 id="saas-access-user-mgmt-title" className="saas-access-settings__title">
                Control Access & Roles
              </h2>
              <div className="saas-access-settings__description">
                <p>
                  Manage users across the organization with clear role definitions, access levels, and site
                  associations.
                </p>
                <p>
                  The system provides full visibility into user status, activity, and permissions, allowing teams
                  to invite new members, track onboarding progress, and ensure the right people have access to
                  the right data.
                </p>
              </div>
            </div>

            <div className="saas-access-settings__media">
              <Image
                className="saas-access-settings__img"
                src={USER_MANAGEMENT_IMG}
                alt="Astra user management table: roles, access levels, and site associations"
                width={720}
                height={400}
                sizes="(max-width: 768px) min(360px, 92vw) min(320px, 36vw)"
              />
            </div>
          </article>

          <article
            className="saas-access-settings-segment saas-access-settings-segment--reverse"
            aria-labelledby="saas-access-system-config-title"
          >
            <div className="saas-access-settings__body">
              <p className="saas-access-settings__label">System Configuration</p>
              <h2 id="saas-access-system-config-title" className="saas-access-settings__title">
                Organization, Branding & Notifications
              </h2>
              <div className="saas-access-settings__description">
                <p>
                  Additional settings support the overall system structure and experience — from defining
                  organization details and authentication methods, to managing branding assets and controlling
                  notification preferences.
                </p>
                <p>
                  Together, these elements ensure consistency, security, and clarity across all users and sites.
                </p>
              </div>
            </div>

            <div className="saas-access-settings__media saas-access-settings__media--video">
              <div className="saas-access-settings__video-frame">
                <video
                  className="saas-access-settings__video"
                  src={SYSTEM_CONFIGURATION_VIDEO}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Organization details, branding, and notification settings in Astra"
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
