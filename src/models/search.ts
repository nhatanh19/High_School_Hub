export type SearchRecentItem = {
  id: string;
  label: string;
};

export type SearchFeatureItem = {
  id: string;
  icon: string;
  iconColor: string;
  subtitle: string;
  title: string;
  tint: string;
};

export type SearchSuggestionItem = {
  id: string;
  avatarLabel: string;
  badge: string;
  icon: string;
  iconTint: string;
  subtitle: string;
  title: string;
  tint: string;
};

export type SearchScreenData = {
  features: SearchFeatureItem[];
  placeholder: string;
  recentItems: SearchRecentItem[];
  suggestions: SearchSuggestionItem[];
};
