import sys
import os

# Add workspace root to sys.path so 'apps.api...' imports resolve cleanly in pytest
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../")))
