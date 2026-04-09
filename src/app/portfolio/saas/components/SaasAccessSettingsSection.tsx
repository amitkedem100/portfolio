import Image from "next/image";
import { ImageCarousel } from "@/app/portfolio/components/ImageCarousel";
import "@/app/portfolio/components/ProjectTextSection.css";
import { SaasStackedMediaBlock } from "@/app/portfolio/saas/components/SaasStackedMediaBlock";
import "./SaasAccessSettingsSection.css";

/* Uses existing image assets under public/images/SaaS (exact filenames) */
const USER_MANAGEMENT_IMG = "/images/SaaS/user-management-table.png";
const SYSTEM_ORGANIZATION_DETAILS_IMG = encodeURI("/images/SaaS/Organization Details.png");
const SYSTEM_BRANDING_IMG = encodeURI("/images/SaaS/Branding.png");
const SYSTEM_NOTIFICATIONS_IMG = encodeURI("/images/SaaS/Notifications Settings.png");
const SYSTEM_CONFIGURATION_SLIDES = [
  {
    src: SYSTEM_ORGANIZATION_DETAILS_IMG,
    alt: "Organization details settings screen in Astra",
    width: 1280,
    height: 720,
  },
  {
    src: SYSTEM_BRANDING_IMG,
    alt: "Branding settings screen in Astra",
    width: 1280,
    height: 720,
  },
  {
    src: SYSTEM_NOTIFICATIONS_IMG,
    alt: "Notifications settings screen in Astra",
    width: 1280,
    height: 720,
  },
];

/* Two-part block: user management + system configuration in shared stacked pattern */
export function SaasAccessSettingsSection() {
  return (
    <section
      className="saas-page-section saas-access-settings project-text-section"
      aria-label="User management and system configuration"
    >
      <div className="project-text-section-inner">
        <div className="saas-access-settings__segments">
          <SaasStackedMediaBlock
            label="User Management"
            title="Control Access & Roles"
            titleId="saas-access-user-mgmt-title"
            paragraphs={[
              "Manage users across the organization with clear role definitions, access levels, and site associations.",
              "The system provides full visibility into user status, activity, and permissions, allowing teams to invite new members, track onboarding progress, and ensure the right people have access to the right data.",
            ]}
            media={
              <div className="saas-access-settings__frame">
                <Image
                  className="saas-access-settings__img"
                  src={USER_MANAGEMENT_IMG}
                  alt="Astra user management table: roles, access levels, and site associations"
                  width={1320}
                  height={760}
                  sizes="(max-width: 768px) 92vw, 1180px"
                />
              </div>
            }
          />

          <SaasStackedMediaBlock
            label="System Configuration"
            title="Organization details, Branding & Notifications"
            titleId="saas-access-system-config-title"
            paragraphs={[
              "Additional settings support the overall system structure and experience — from defining organization details and authentication methods, to managing branding assets and controlling notification preferences.",
              "Together, these elements ensure consistency, security, and clarity across all users and sites.",
            ]}
            media={
              <ImageCarousel
                className="saas-access-settings__carousel"
                slides={SYSTEM_CONFIGURATION_SLIDES}
                sizes="(max-width: 768px) 92vw, 1180px"
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
