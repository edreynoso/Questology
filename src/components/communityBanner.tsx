import { FaWrench } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { CommunityProps } from "../data/communities";
import { bannerStyle } from "../utils/bannerStyle";
import "./communityBanner.css";

export default function CommunityBanner({
  community,
}: {
  community: CommunityProps;
}) {
  const style = bannerStyle(community.bannerUrl);
  const isModeratedCommunity = community.isModerated;

  return (
    <div className="CommunityBannerWrapper">
      <Link
        to={`/communities/${community.id}`}
        className="CommunityBanner"
        style={style}
      >
        {isModeratedCommunity && (
          <span
            className="ModeratedCommunityIcon"
            aria-label="Moderated community"
            title="Moderated community"
          >
            <FaWrench aria-hidden="true" />
          </span>
        )}

        <h2>{community.name}</h2>
      </Link>

    </div>
  );
}