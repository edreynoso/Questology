import { FaCog, FaScroll, FaWrench } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type { CommunityProps } from "../data/communities";
import { bannerStyle } from "../utils/bannerStyle";
import "./communityBanner.css";

export default function CommunityBanner({
  community,
}: {
  community: CommunityProps;
}) {
  const navigate = useNavigate();
  const style = bannerStyle(community.bannerUrl);
  const isModeratedCommunity = community.id === "rock-climbing";

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

      {isModeratedCommunity && (
        <div className="CommunityModeratorActions">
          <button
            type="button"
            className="CommunityModeratorButton"
            aria-label="Pending quests"
            title="Pending quests"
            onClick={() => navigate("/moderator/quests")}
          >
            <FaScroll aria-hidden="true" />
          </button>

          <button
            type="button"
            className="CommunityModeratorButton"
            aria-label="Community settings"
            title="Community settings"
            onClick={() =>
              toast.info("Community settings are not implemented yet!")
            }
          >
            <FaCog aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}