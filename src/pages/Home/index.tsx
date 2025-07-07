import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageLayout from "../../components/layout/PageLayout";
import Navbar from "../../components/layout/Navbar";
import Container from "../../components/common/Container";
import EventBlock from "../../components/event/EventBlock";
import LogoTitle from "../../components/common/LogoTitle";
import SearchPanel from "../../components/search/SearchPanel";
import AdsBlock from "../../components/ads/AdsBlock";
import Footer from "../../components/common/Footer";
import RecommendedRecipeList from "../../components/recipe/RecommendedRecipeList";
import HomeRecipeList from "../../components/recipe/HomeRecipeList";

import { getPublicAds } from "../../services/adsService";
import { Recipe } from "../../types/recipe";
import { searchRecipesByCategory } from "../../services/recipeService";
import { SearchMode } from "../../types/SearchPanel.types";
import { getChatRecommendations } from "../../services/recommendService";
import { Ad } from "../../types/ads";
import { getEventBanners } from "../../services/eventService";
import { EventBanner } from "../../types/event";
import { ASSET_URLS } from "../../constants/assets";

const Home = () => {
  const navigate = useNavigate();

  const [selectedMode, setSelectedMode] = useState<SearchMode>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const [categoryFilters, setCategoryFilters] = useState({
    dishType: "전체",
    situationType: "전체",
    ingredientType: "전체",
    methodType: "전체",
    cookingTime: "전체",
    difficulty: "전체",
  });

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [aiRecommendedRecipes, setAiRecommendedRecipes] = useState<Recipe[]>(
    []
  );
  const [adsByPosition, setAdsByPosition] = useState<Record<string, Ad[]>>({});
  const [events, setEvents] = useState<EventBanner[]>([]);

  useEffect(() => {
    if (selectedMode === "category") {
      handleCategorySearch();
    }
  }, [categoryFilters]);

  useEffect(() => {
    getEventBanners("MAIN_TOP", 20)
      .then(setEvents)
      .catch((err) => console.error("이벤트 데이터 오류:", err));

    getChatRecommendations()
      .then((res) => setAiRecommendedRecipes(res.recommendedRecipes))
      .catch((err) => console.error("AI 추천 레시피 오류:", err));

    getPublicAds()
      .then(setAdsByPosition)
      .catch((err) => console.error("광고 데이터 오류:", err));
  }, []);

  const [popularRecipes, setPopularRecipes] = useState<string[]>([]);
  useEffect(() => {
    setPopularRecipes([
      "김치라면",
      "부대찌개",
      "청국장",
      "밤타리아누",
      "양념갈비",
    ]);
  }, []);

  const handleCategorySearch = async () => {
    try {
      const qs = new URLSearchParams();
      Object.entries(categoryFilters).forEach(([key, value]) => {
        if (value !== "전체") {
          qs.set(key, value);
        }
      });
      navigate(`/search/category?${qs.toString()}`);
    } catch (e) {
      console.error(e);
      alert("카테고리 검색 중 오류가 발생했습니다.");
    }
  };

  const handleNaturalSearch = async () => {
    try {
      const qs = new URLSearchParams();
      qs.set("keyword", searchKeyword);
      qs.set("page", "1");
      navigate(`/search/natural?${qs.toString()}`);
    } catch (e) {
      console.error(e);
      alert("자연어 검색 중 오류가 발생했습니다.");
    }
  };

  const handleSearch = () => {
    if (
      selectedMode === null ||
      (selectedMode === "category" && searchKeyword)
    ) {
      handleNaturalSearch();
    } else if (selectedMode === "menu") {
      const qs = new URLSearchParams();
      qs.set("keyword", searchKeyword);
      qs.set("page", "1");
      navigate(`/search/menu?${qs.toString()}`);
    } else if (selectedMode === "ingredient") {
      const qs = new URLSearchParams();
      qs.set("keyword", searchKeyword);
      qs.set("page", "1");
      navigate(`/search/ingredient?${qs.toString()}`);
    }
  };

  const handleSearchKeywordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <PageLayout>
      <Navbar />

      <div className="py-8">
        <Container>
          <LogoTitle />
          <SearchPanel
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
            searchKeyword={searchKeyword}
            onSearchKeywordChange={handleSearchKeywordChange}
            categoryFilters={categoryFilters}
            onCategoryFiltersChange={setCategoryFilters}
            onSearch={handleSearch}
          />

          {/* 상단 이벤트/광고 영역 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* 이벤트 */}
            <div className="h-[120px] relative">
              {events[0] ? (
                <EventBlock event={events[0]} />
              ) : (
                <div className="h-full rounded-2xl bg-white shadow flex items-center justify-center">
                  <img
                    src={ASSET_URLS.eventPlaceholder}
                    alt="이벤트 준비 중"
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              )}
            </div>

            {/* 상단 광고 */}
            <div className="h-[120px] relative">
              <AdsBlock
                ad={adsByPosition["MAIN_TOP"]?.[0] || null}
                className="h-full"
              />
            </div>
          </div>

          {/* 홈 레시피 리스트 */}
          <HomeRecipeList />

          {/* 중간 광고 */}
          {adsByPosition["MAIN_MIDDLE"]?.[0] && (
            <div className="mb-8">
              <div className="w-full max-w-6xl mx-auto h-[120px]">
                <AdsBlock
                  ad={adsByPosition["MAIN_MIDDLE"][0]}
                  aspectRatio="auto"
                  className="h-full w-full rounded-2xl"
                />
              </div>
            </div>
          )}
          {/* AI 추천 레시피 */}
          {aiRecommendedRecipes.length > 0 && (
            <RecommendedRecipeList
              recipes={aiRecommendedRecipes}
              onCardClick={(id) => navigate(`/recipe/${id}`)}
            />
          )}

          {/* 하단 콘텐츠 영역 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* 인기 급상승 레시피 */}
            <div className="bg-white p-6 rounded-2xl shadow">
              <h3 className="font-bold mb-2">인기 급상승 레시피 🔥</h3>
              <ol className="list-decimal pl-4 space-y-1">
                {popularRecipes.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>

            {/* 당근 추천 영역 */}
            <div className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
              <div>
                <h3 className="font-bold mb-2">
                  근래{" "}
                  <span className="text-[#F15A24] font-semibold">당근</span>을
                  가장 많이 검색하셨네요!
                </h3>
                <p className="text-sm mb-4">
                  '당근'을 재료로 하는 인기 레시피를 추천해드릴게요.
                </p>
              </div>
              <button className="self-start px-4 py-2 bg-[#5C2E1E] text-white rounded-full text-xs">
                [ 당근 라떼 샌드위치 ] 확인하기 &gt;
              </button>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </PageLayout>
  );
};

export default Home;
