import React, { useState, useEffect} from 'react';
import './index.css';

const Blog = () => {
  const [activeTab, setActiveTab] = useState(0);


  useEffect(() => {
        document.title = "Blog - Annapurna Farms";
  }, []);

  const tabs = [
    {
      name: 'Coconut Powder',
      content: (
        <>
          <h2>Coconut Powder: The Perfect Blend of Taste and Convenience</h2>
          <p>
            Annapurna Farms, we believe in bringing nature to your kitchen with our Coconut Powder, crafted from naturally sun-dried and finely ground coconut. This versatile ingredient captures the richness and creamy flavor of fresh coconuts, offering unmatched convenience and quality. Whether you're cooking, baking, or enhancing a skincare routine, our coconut powder is your ultimate companion for natural goodness.
          </p>
          <h3>Why Choose Annapurna Farms’ Coconut Powder?</h3>
          <ul>
            <li><strong>100% Natural:</strong> Made from pure, sun-dried coconut with no preservatives.</li>
            <li><strong>Rich in Flavor:</strong> Delivers the authentic, creamy essence of coconut in every scoop.</li>
            <li><strong>Versatile:</strong> Perfect for cooking, baking, and even DIY beauty treatments.</li>
            <li><strong>Easy to Use:</strong> Ready-to-use and long-lasting, no grating or cracking required!</li>
          </ul>
          <h3>How to Use Coconut Powder in Cooking</h3>
          <h4>Savory Delights</h4>
          <ul>
            <li><strong>Curries:</strong> Add 2 tbsp coconut powder to thicken and enrich curries and gravies.</li>
            <li><strong>Soups:</strong> Stir into lentil soups or Thai-inspired broths for a hint of coconut creaminess.</li>
            <li><strong>Rice Dishes:</strong> Mix 1 tbsp into biryanis or coconut rice for enhanced flavor.</li>
          </ul>
          <h4>Sweet Treats</h4>
          <ul>
            <li><strong>Cakes and Muffins:</strong> Replace a portion of your flour with 2 tbsp coconut powder for a moist, flavorful texture.</li>
            <li><strong>Smoothies and Shakes:</strong> Blend 1 tbsp with milk, banana, and vanilla for a tropical smoothie.</li>
            <li><strong>Traditional Sweets:</strong> Use in ladoos or barfis for authentic Indian desserts with a coconut twist.</li>
          </ul>
          <h3>How to Use Coconut Powder in Skincare</h3>
          <h4>Nourishing Face Mask</h4>
          <ul>
            <li><strong>1 tbsp coconut powder</strong></li>
            <li><strong>1 tbsp honey</strong></li>
            <li><strong>1 tsp turmeric</strong></li>
            <li>Mix into a paste and apply as a face mask. Leave for 15 minutes, then rinse for soft, radiant skin.</li>
          </ul>
          <h4>Exfoliating Scrub</h4>
          <ul>
            <li><strong>2 tbsp coconut powder</strong></li>
            <li><strong>1 tbsp sugar</strong></li>
            <li><strong>1 tbsp coconut oil</strong></li>
            <li>Massage onto your skin in circular motions, then rinse with lukewarm water.</li>
          </ul>
          <h3>Storing Coconut Powder the Right Way</h3>
          <ul>
            <li>Transfer it to an airtight container after opening.</li>
            <li>Store in a cool, dry place away from humidity.</li>
            <li>If clumps form, break them apart with a spoon or blend gently.</li>
          </ul>
          <h3>Coconut Powder: A Kitchen and Beauty Must-Have</h3>
          <p>
            Whether you're whipping up a quick meal, crafting desserts, or pampering your skin, coconut powder is an indispensable ingredient. Its convenience and versatility make it a favorite for home cooks and DIY beauty enthusiasts alike.
          </p>
          <p>
            Bring home the tropical goodness with Annapurna Farms’ Coconut Powder, available in sizes to suit all your needs. It’s natural, pure, and ready to elevate your cooking and wellness routine.
          </p>
          <p>Discover the power of coconuts with Annapurna Farms today!</p>
        </>
      ),
    },
    {
      name: 'Moringa Powder',
      content: (
        <>
          <h2>Moringa Powder: A Natural Superfood for Everyday Life</h2>
          <p>
            Annapurna Farms, we bring you the best of nature with our carefully crafted Moringa
            Powder, made from sun-dried leaves of the moringa tree, often called the "Tree of Life." Packed
            with essential nutrients, moringa powder is a versatile addition to your daily routine, whether
            you’re cooking, boosting your health, or enhancing your beauty regimen.
          </p>
          <h3>Why Choose Moringa Powder from Annapurna Farms?</h3>
          <ul>
            <li><strong>100% Natural:</strong> Sun-dried and powdered with no additives or preservatives.</li>
            <li><strong>Nutrient-Rich:</strong> High in protein, fiber, calcium, iron, and antioxidants.</li>
            <li><strong>Versatile:</strong> Suitable for beverages, meals, and skincare routines.</li>
            <li><strong>Eco-Friendly:</strong> Grown and processed sustainably.</li>
          </ul>
          <h3>How to Use Moringa Powder in Your Daily Diet</h3>
          <h4>Morning Power Boost</h4>
          <ul>
            <li><strong>Smoothies:</strong> Blend 1 tsp moringa powder with banana, spinach, and almond milk for a nutrient-packed green smoothie.</li>
            <li><strong>Tea:</strong> Stir moringa powder into hot water with a dash of lemon juice and honey for a refreshing, detoxifying tea.</li>
          </ul>
          <h4>Cooking with Moringa</h4>
          <ul>
            <li><strong>Soups and Curries:</strong> Sprinkle 1-2 tsp into soups, dals, or curries for an added dose of nutrients.</li>
            <li><strong>Salads:</strong> Mix it with olive oil, lime juice, and salt to create a nutritious dressing.</li>
            <li><strong>Baking:</strong> Add 1 tbsp moringa powder to muffin or bread batter for a healthy twist.</li>
          </ul>
          <h3>How to Use Moringa Powder for Wellness</h3>
          <h4>Daily Health Tonic</h4>
          <ul>
            <li>1 tsp moringa powder</li>
            <li>1 glass lukewarm water</li>
            <li>Add a splash of lemon or mint for taste.</li>
          </ul>
          <h4>Post-Workout Recovery</h4>
          <p>
            With its high protein and iron content, moringa powder is ideal for recovery after exercise. Add it
            to your protein shake or simply mix it with coconut water for a natural energy boost.
          </p>
          <h3>How to Use Moringa Powder in Skincare</h3>
          <h4>DIY Moringa Face Mask</h4>
          <ul>
            <li>1 tbsp moringa powder</li>
            <li>1 tbsp yogurt or honey</li>
            <li>1 tsp rosewater</li>
            <li>Mix into a paste, apply to your face, and leave for 15 minutes. Wash off to reveal fresh, glowing skin.</li>
          </ul>
          <h4>Hair Treatment</h4>
          <ul>
            <li>2 tbsp moringa powder</li>
            <li>1 tbsp coconut oil</li>
            <li>1 tsp aloe vera gel</li>
            <li>Apply to your scalp and hair, leave for 30 minutes, and rinse for softer, healthier locks.</li>
          </ul>
          <h3>Tips for Storing Moringa Powder</h3>
          <ul>
            <li>Store in an airtight container to prevent moisture absorption.</li>
            <li>Place in a cool, dry spot away from direct sunlight.</li>
            <li>Use a clean, dry spoon each time to avoid contamination.</li>
          </ul>
          <h3>Why Moringa Powder Belongs in Your Pantry</h3>
          <p>
            Moringa powder is not just an ingredient; it’s a lifestyle enhancer. Its numerous health benefits,
            coupled with its versatility, make it a must-have for modern living.
          </p>
          <p>
            Add the magic of moringa to your daily routine with Annapurna Farms’ Moringa
            Powder—natural, pure, and packed with goodness. Available in convenient sizes to suit your needs.
          </p>
          <p>Start your journey to better health and wellness with Annapurna Farms today.</p>
        </>
      ),
    },
    {
      name: 'Rose Powder',
      content: (
        <>
          <h2>How to Use Rose Powder: Nature’s Fragrant Treasure</h2>
          <h3>What is Rose Powder?</h3>
          <p>
            Rose powder is a versatile, fragrant ingredient made by finely grinding naturally dried
            rose petals. At Annapurna Farms, we ensure our rose powder is made using sun-dried petals,
            preserving its natural aroma, color, and benefits.
          </p>
          <p>
            Rich in antioxidants and soothing properties, rose powder is perfect for culinary, skincare, and
            wellness applications. It’s an age-old ingredient that brings elegance and health benefits to
            whatever it touches.
          </p>
          <h3>How to Use Rose Powder in Beverages</h3>
          <ul>
            <li>Add 1 tsp of rose powder to warm milk or tea for a calming drink.</li>
            <li>Blend with your favorite smoothie ingredients for a floral twist.</li>
            <li>Mix into lemonade or chilled water for a refreshing rose-infused drink.</li>
          </ul>
          <h3>How to Use Rose Powder in Cooking</h3>
          <ul>
            <li>Sprinkle over desserts like cakes, cookies, or ice cream for a floral aroma.</li>
            <li>Add to yogurt or oatmeal for a naturally sweet flavor.</li>
            <li>Mix into batters for pancakes or muffins for a subtle rose essence.</li>
          </ul>
          <h3>How to Use Rose Powder in Skincare</h3>
          <p>
            Rose powder is known for its soothing, anti-inflammatory, and rejuvenating properties, making it
            an ideal ingredient for natural skincare.
          </p>
          <h4>DIY Rose Face Mask:</h4>
          <ul>
            <li>1 tbsp rose powder</li>
            <li>1 tbsp yogurt or honey</li>
            <li>Mix into a paste and apply to your face for 15 minutes. Rinse with cool water to reveal soft, glowing skin.</li>
          </ul>
          <p>
            Other skincare uses: Add to your bath for a relaxing soak or mix with aloe vera gel as a natural toner.
          </p>
          <h3>How to Store Rose Powder</h3>
          <ul>
            <li>Keep it in an airtight container away from direct sunlight.</li>
            <li>Store in a cool, dry place to prevent moisture absorption.</li>
            <li>If clumps form, gently break them apart by hand or sift the powder.</li>
          </ul>
          <h3>Why Choose Annapurna Farms’ Rose Powder?</h3>
          <ul>
            <li>100% Natural: Made from sun-dried rose petals without additives.</li>
            <li>Versatile: Ideal for culinary, skincare, and wellness uses.</li>
            <li>Rich in Fragrance: Captures the pure essence of roses.</li>
            <li>Nutrient-Rich: Packed with antioxidants and soothing properties.</li>
          </ul>
          <p>
            Explore the magic of roses with Annapurna Farms’ Rose Powder—available in sizes tailored to your
            needs. Bring home the natural goodness of roses today.
          </p>
        </>
      ),
    },
    { 
      name: 'Tomato Powder', 
      content: (
        <div>
          <h2>How to Use Tomato Powder: Your Kitchen’s Secret Ingredient</h2>
          <h3>What is Tomato Powder?</h3>
          <p>
            Tomato powder is a versatile and flavorful ingredient made from dehydrated, ripe 
            tomatoes that are ground into a fine powder. At Annapurna Farms, we produce our 
            tomato powder naturally by sun-drying fresh tomatoes to retain their nutrients, 
            color, and authentic taste.
          </p>
          <h3>How to Use Tomato Powder in Sauces</h3>
          <p>
            Tomato powder works wonders in sauces, providing a deep tomato flavor in seconds. 
            Whether you’re making pasta sauce, curry gravy, or pizza sauce, just mix a tablespoon 
            of tomato powder with water to create an instant, rich tomato paste.
          </p>
          <ul>
            <li>For every 2 tablespoons of tomato powder, add 1/4 cup of water for a smooth paste.</li>
            <li>Add it while cooking sauces or curries to thicken and enhance the flavor.</li>
            <li>Sprinkle directly into soups and stews for a tangy tomato kick.</li>
          </ul>
          <h3>How to Use Tomato Powder in Seasonings</h3>
          <p>
            Tomato powder can easily transform into a flavorful seasoning. Combine it with herbs 
            and spices to create custom rubs or spice mixes. Try it in:
          </p>
          <ul>
            <li><strong>Popcorn Seasoning:</strong> Mix tomato powder with salt, paprika, and a dash of garlic powder for a savory snack.</li>
            <li><strong>Dry Rubs:</strong> Blend tomato powder with cumin, chili powder, and black pepper for meat or vegetables.</li>
          </ul>
          <h3>How to Store Tomato Powder</h3>
          <p>
            Proper storage is key to preserving its texture and flavor. At Annapurna Farms, we recommend:
          </p>
          <ul>
            <li>Store in an airtight container immediately after opening.</li>
            <li>Keep in a cool, dry place to prevent clumping.</li>
            <li>If clumps form, break them by hand or grind them using a spice grinder.</li>
          </ul>
          <h3>Why Choose Annapurna Farms’ Tomato Powder?</h3>
          <ul>
            <li><strong>100% Natural:</strong> Made from sun-dried tomatoes without preservatives.</li>
            <li><strong>Versatile:</strong> Perfect for a variety of dishes—soups, curries, marinades, and more.</li>
            <li><strong>Rich in Flavor:</strong> Packed with the natural sweetness and tanginess of ripe tomatoes.</li>
            <li><strong>Convenient:</strong> No more peeling or chopping tomatoes—just scoop and cook!</li>
          </ul>
          <p>
            Make your cooking more flavorful and hassle-free with Annapurna Farms’ Tomato 
            Powder—available in sizes perfect for your needs. Bring home the magic of natural 
            tomato goodness today.
          </p>
        </div>
      )
    }
  ];
  

  const cards = [
    {
      id: 1,
      title: 'POWDER',
      alternateTitle: 'Benefits Of Tomato Powder',
      image: '/img/blog_img_3.jpg',
    },
    {
      id: 2,
      title: 'OILS',
      alternateTitle: 'Benefits Of Almond Oil',
      image: '/img/blog_img_1.jpg',
    },
    {
      id: 3,
      title: 'PICKLES',
      alternateTitle: 'Benefits Of Tomato Pickles',
      image: '/img/blog_img_2.jpg',
    },
  ];

  return (
    <div className="blog-container">
      <div className="carousel-containers">
        <div
          className="carousel-image"
          style={{ backgroundImage: 'url(/img/blog_image.jpg)' }}
        >
          <div className="carousel-content">
            <h1>
              PURELY NATURAL, TRULY <br />
              INDIAN – FARM-FRESH GOODNESS <br />
              FOR EVERY MEAL
            </h1>
          </div>
        </div>
      </div>

      <div className="blog-grid-container">
        <div className="blog-content-container">
          <div className="blog-tab-content">
            <h5>—Blog</h5>
            {tabs[activeTab] && <p>{tabs[activeTab].content}</p>}
          </div>
        </div>

        <div className="blog-tabs-container">
          <div className="blog-logo">
            <img src="/img/blog-products.jpg" alt="blog-products" />
          </div>
          <div className="blog-tabs">
            <h3 className="new-section-title">Products</h3>
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`blog-tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => setActiveTab(index)}
              >
                <span>{tab.name}</span>
              </div>
            ))}
          </div>
          <div className="blog-share-content">
            <h3>Share Content</h3>
            <div className="blog-social-links">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
              <a
                href="mailto:someone@example.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Email
              </a>
              <a
                href="https://www.whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="cards-section_2">
        <h2 className="section-title_2">You might love</h2>
        <div className="cards-grid_2">
          {cards.map((card) => (
            <div key={card.id} className="card_2">
              <img src={card.image} alt={`${card.title}`} />
              <h5 className="card-title_2">{card.title}</h5>
              <h2 className="card-alternate-title_2">{card.alternateTitle}</h2>
              <p className="card-content_2">{card.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;